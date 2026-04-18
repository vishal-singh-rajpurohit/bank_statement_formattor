import pandas as pd
from xml.etree.ElementTree import Element, SubElement, ElementTree
import pdfplumber
from datetime import datetime

def zero_page(page):
     header = ['Date', 'Narration', ' Chq/Ref No', 'Withdrawal(Dr)/Deposit(Cr)', 'Balance']

     table = page.extract_table({
        "vertical_strategy": "text",
        "horizontal_strategy": "text",
     })

     table_format = table[30:]


     final_list = [header]

     for i in range(len(table_format)):
         if(table_format[i][0] == ''):
            continue
         
         raw = []
         raw.append(table_format[i][0])
         raw.append(f'{table_format[i][1]}{table_format[i][2]}')
         raw.append(f'{table_format[i][3]}{table_format[i][4]}')
         raw.append(f'{table_format[i][5]}{table_format[i][6]}{table_format[i][7]}')
         raw.append(table_format[i][8])

         final_list.append(raw)
    
     frame = pd.DataFrame(final_list)

     frame.columns = frame.iloc[0]
     frame = frame[1:]
     frame = frame.reset_index(drop=True)
     frame.columns = frame.columns.str.strip()
     
     return frame

def sec_last_page(page):
    header = ['Date', 'Narration', ' Chq/Ref No', 'Withdrawal(Dr)/Deposit(Cr)', 'Balance']

    table = page.extract_table({
        "vertical_strategy": "text",
        "horizontal_strategy": "text",
    })

    final_table = [header]

    for i in range(len(table)):
        if(table[i][0] == ''):
            continue
        
        raw = []
        raw.append(f'{table[i][0]}')
        raw.append(f'{table[i][1]}{table[i][2]}')
        raw.append(f'{table[i][3]}')
        raw.append(f'{table[i][4]}')
        raw.append(f'{table[i][5]}')
        
        final_table.append(raw)
    
    frame = pd.DataFrame(final_table)
    frame.columns = frame.iloc[0]
    frame = frame[1:]
    frame = frame.reset_index(drop=True)
    frame.columns = frame.columns.str.strip()

    return frame

def last_page(page):
    header = ['Date', 'Narration', ' Chq/Ref No', 'Withdrawal(Dr)/Deposit(Cr)', 'Balance']

    table = page.extract_table({
        "vertical_strategy": "text",
        "horizontal_strategy": "text",
    })
    
    tb = table[4:]
    tb = tb[:len(tb) - 13]
    final_table = [header]

    for i in range(len(tb)):
        if(tb[i][0] == ''):
            continue

        final_table.append(tb[i])
    
    frame = pd.DataFrame(final_table)
    frame.columns = frame.iloc[0]
    frame = frame[1:]
    frame = frame.reset_index(drop=True)
    frame.columns = frame.columns.str.strip()

    return frame

def process_pdf(full_path: str):
    with pdfplumber.open(full_path) as pdf:
        header = ['Date', 'Narration', ' Chq/Ref No', 'Withdrawal(Dr)/Deposit(Cr)', 'Balance']
        df = zero_page(pdf.pages[0])

        for i in range(1, len(pdf.pages) - 2):
            page = pdf.pages[i]

            table = page.extract_table({
                "vertical_strategy": "text",
                "horizontal_strategy": "text",
            })

            table_format = table[4:]

            final_list = [header]
            
            for i in range(len(table_format)):
                if(table_format[i][0] == ''):
                    continue

                final_list.append(table_format[i])
            
            frame = pd.DataFrame(final_list)
            frame.columns = frame.iloc[0]
            frame = frame[1:]
            frame = frame.reset_index(drop=True)
            frame.columns = frame.columns.str.strip()

            df = pd.concat([df, frame])

        second_last_frame = sec_last_page(pdf.pages[len(pdf.pages) - 2])
        frame = last_page(pdf.pages[len(pdf.pages) - 1])
        df = pd.concat([df, second_last_frame,  frame])

        return df
    
def format_date(date_str):
    # Input: 10-06-2024 → Output: 20240610
    return datetime.strptime(date_str, "%d-%m-%Y").strftime("%Y%m%d")

def parse_amount(amount_str):
    # Example: "120.00(Dr)" or "15,000.00(Cr)"
    amount_str = amount_str.replace(",", "")
    
    if "(Dr)" in amount_str:
        return -float(amount_str.replace("(Dr)", "").strip())
    elif "(Cr)" in amount_str:
        return float(amount_str.replace("(Cr)", "").strip())
    return 0

def create_tally_xml(df: pd.DataFrame, party_ledger_name: str, output_file="output.xml"):
    
    envelope = Element("ENVELOPE")

    header = SubElement(envelope, "HEADER")
    SubElement(header, "TALLYREQUEST").text = "Import Data"

    body = SubElement(envelope, "BODY")
    importdata = SubElement(body, "IMPORTDATA")
    requestdesc = SubElement(importdata, "REQUESTDESC")
    SubElement(requestdesc, "REPORTNAME").text = "Vouchers"

    requestdata = SubElement(importdata, "REQUESTDATA")

    for _, row in df.iterrows():
        
        date = format_date(row["Date"])
        narration = str(row["Narration"]).replace("\n", " ")
        ref = str(row["Chq/Ref No"])
        amount = parse_amount(row["Withdrawal(Dr)/Deposit(Cr)"])

        voucher_type = "Payment" if amount < 0 else "Receipt"

        tally_msg = SubElement(requestdata, "TALLYMESSAGE")
        voucher = SubElement(
            tally_msg,
            "VOUCHER",
            VCHTYPE=voucher_type,
            ACTION="Create"
        )

        SubElement(voucher, "DATE").text = date
        SubElement(voucher, "VOUCHERTYPENAME").text = voucher_type
        SubElement(voucher, "NARRATION").text = narration
        SubElement(voucher, "PARTYLEDGERNAME").text = party_ledger_name

        # 🔻 First Entry (Suspense)
        entry1 = SubElement(voucher, "ALLLEDGERENTRIES.LIST")
        SubElement(entry1, "LEDGERNAME").text = "Suspense"
        SubElement(entry1, "ISDEEMEDPOSITIVE").text = "Yes" if amount > 0 else "No"
        SubElement(entry1, "AMOUNT").text = str(-amount)

        # 🔻 Second Entry (Bank Ledger)
        entry2 = SubElement(voucher, "ALLLEDGERENTRIES.LIST")
        SubElement(entry2, "LEDGERNAME").text = party_ledger_name
        SubElement(entry2, "ISDEEMEDPOSITIVE").text = "No" if amount > 0 else "Yes"
        SubElement(entry2, "AMOUNT").text = str(amount)

        # Bank Allocation
        bank_alloc = SubElement(entry2, "BANKALLOCATIONS.LIST")
        SubElement(bank_alloc, "DATE").text = date
        SubElement(bank_alloc, "INSTRUMENTDATE").text = date
        SubElement(bank_alloc, "TRANSACTIONTYPE").text = "Cheque"
        SubElement(bank_alloc, "INSTRUMENTNUMBER").text = ref
        SubElement(bank_alloc, "AMOUNT").text = str(amount)

    # Save XML
    tree = ElementTree(envelope)
    tree.write(output_file, encoding="utf-8", xml_declaration=True)

    print(f"✅ XML Generated: {output_file}")

def katak_mahindra_formattor(path: str, ledger_name: str, output_path: str):

    df = process_pdf(path)

    df = df[df["Date"] != "Date"]

    df = df.dropna(subset=["Date"])

    create_tally_xml(
        df,
        party_ledger_name=ledger_name,
        output_file=output_path
    )