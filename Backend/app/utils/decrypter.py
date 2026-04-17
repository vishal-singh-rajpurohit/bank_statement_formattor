from pypdf import PdfReader, PdfWriter

# Decrypt pdf and open in reader
def decrpt_pdf(path: str, name: str, password: str) ->str:
    reader = PdfReader(f'{path}/{name}.pdf')
    
    if reader.is_encrypted:
        reader.decrypt(password)
    
    writer = PdfWriter()

    for page in reader.pages:
        writer.add_page(page)

    with open(f"{path}/{name}-unlocked.pdf", "wb") as f:
        writer.write(f)
    
    return f"{path}/{name}-unlocked.pdf"
