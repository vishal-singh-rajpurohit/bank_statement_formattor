import pandas as pd
import xml.etree.ElementTree as ET
import pdfplumber
from ..converter import convert_to_xlsx


def to_page_zero(pdf):
    page = pdf.pages[0]

    table = page.extract_tables()[4]

    header = []

    for i in table[0]:
        header.append(i.replace('\n', ' '))
    
    table[0] = header
    
    table[1][2] = table[1][2].replace('\n', ' ')

    for i in range(1, len(table[0]) - 1):
        table[i][2] = table[i][2].replace('\n', ' ')
        table[i][3] = table[i][3].replace('\n', '')
    
    df = pd.DataFrame(table)
    return df
    

def to_page_all(page):
    
        table = page.extract_tables()[0]

        header = []

        for i in table[0]:
            header.append(i.replace('\n', ' '))
        
        table[0] = header

        table[0][2] = table[0][2].replace('\n', ' ')


        for i in range(1, len(table[0]) - 1):
            table[i][2] = table[i][2].replace('\n', ' ')
            table[i][3] = table[i][3].replace('\n', '')
        
        return pd.DataFrame(table)


def clean_num(val):
    try:
        v = str(val).replace(',', '').strip()
        if v in ['', '-', 'nan', 'None']:
            return 0.0
        return float(v)
    except:
        return 0.0
    

def au_processor(path):
    
    with pdfplumber.open(path) as pdf:
        df = to_page_zero(pdf)

        for i in range(1, len(pdf.pages)):
            page = pdf.pages[i]
            frame = to_page_all(page)
            df = pd.concat([df, frame])
        
        return df


def clean_amount(val):
    if pd.isna(val):
        return 0

    val = str(val).strip()

    # Skip header or invalid values
    if val in ["", "-", "Debit (₹)", "Credit (₹)"]:
        return 0

    try:
        return float(val.replace(",", ""))
    except:
        return 0


def format_date(date):
    date = pd.to_datetime(date, errors="coerce")
    if pd.isna(date):
        return ""
    return date.strftime("%Y%m%d")

def convert_excel_to_tally_xml(file_path, party_ledger_name, output_file="output.xml"):
    
    df = pd.read_excel(file_path, header=1)

    df["Debit (₹)"] = pd.to_numeric(df["Debit (₹)"], errors="coerce")
    df["Credit (₹)"] = pd.to_numeric(df["Credit (₹)"], errors="coerce")

    df = df.fillna(0)

    df = df[df["Transaction Date"] != "Transaction Date"]

    envelope = ET.Element("ENVELOPE")

    header = ET.SubElement(envelope, "HEADER")
    ET.SubElement(header, "TALLYREQUEST").text = "Import Data"

    body = ET.SubElement(envelope, "BODY")
    importdata = ET.SubElement(body, "IMPORTDATA")

    requestdesc = ET.SubElement(importdata, "REQUESTDESC")
    ET.SubElement(requestdesc, "REPORTNAME").text = "All Masters"

    requestdata = ET.SubElement(importdata, "REQUESTDATA")

    for _, row in df.iterrows():

        date_val = format_date(row["Transaction Date"])
        narration = str(row["Description/Narration"]).replace("\n", " ")

        debit = clean_amount(row["Debit (₹)"])
        credit = clean_amount(row["Credit (₹)"])

        amount = debit if debit > 0 else credit

        if amount == 0:
            continue

        instrument = str(row["Cheque/ Reference No."])

        voucher = ET.Element("TALLYMESSAGE", xmlns_UDF="TallyUDF")

        v = ET.SubElement(
            voucher,
            "VOUCHER",
            VCHTYPE="Payment",
            ACTION="Create",
            OBJVIEW="Accounting Voucher View"
        )

        ET.SubElement(v, "DATE").text = date_val
        ET.SubElement(v, "VOUCHERTYPENAME").text = "Payment"
        ET.SubElement(v, "NARRATION").text = narration
        ET.SubElement(v, "PARTYLEDGERNAME").text = party_ledger_name
        ET.SubElement(v, "EFFECTIVEDATE").text = date_val

        # Debit (Suspense)
        l1 = ET.SubElement(v, "ALLLEDGERENTRIES.LIST")
        ET.SubElement(l1, "LEDGERNAME").text = "Suspense"
        ET.SubElement(l1, "ISDEEMEDPOSITIVE").text = "Yes"
        ET.SubElement(l1, "AMOUNT").text = f"-{amount}"

        # Credit (Bank)
        l2 = ET.SubElement(v, "ALLLEDGERENTRIES.LIST")
        ET.SubElement(l2, "LEDGERNAME").text = party_ledger_name
        ET.SubElement(l2, "ISDEEMEDPOSITIVE").text = "No"
        ET.SubElement(l2, "AMOUNT").text = f"{amount}"

        bank = ET.SubElement(l2, "BANKALLOCATIONS.LIST")
        ET.SubElement(bank, "DATE").text = date_val
        ET.SubElement(bank, "INSTRUMENTDATE").text = date_val
        ET.SubElement(bank, "TRANSACTIONTYPE").text = "Cheque"
        ET.SubElement(bank, "PAYMENTFAVOURING").text = "Suspense"
        ET.SubElement(bank, "INSTRUMENTNUMBER").text = instrument
        ET.SubElement(bank, "PAYMENTMODE").text = "Transacted"
        ET.SubElement(bank, "AMOUNT").text = f"{amount}"

        requestdata.append(voucher)

    tree = ET.ElementTree(envelope)
    tree.write(f'outputs/{output_file}', encoding="utf-8", xml_declaration=True)

    print(f"✅ XML Generated: {output_file}")

def wrapper_convertor(file_name: str, excel_path: str, party_ledger_name: str):
    frame = au_processor(file_name)
    xlsx_apath = convert_to_xlsx(frame, excel_path, 'sheet1')
    convert_excel_to_tally_xml(xlsx_apath, party_ledger_name, output_file=f'{party_ledger_name}.xml')