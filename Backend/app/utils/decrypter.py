from pypdf import PdfReader, PdfWriter

# Decrypt pdf and open in reader
def decrpt_pdf(path: str, password: str) ->str:
    reader = PdfReader(f'{path}')
    
    if reader.is_encrypted:
        reader.decrypt(password)
    
    writer = PdfWriter()

    for page in reader.pages:
        writer.add_page(page)

    with open(f"{path}", "wb") as f:
        writer.write(f)
    
    print('updated')
    return f"{path}"
