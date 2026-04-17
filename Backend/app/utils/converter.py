def convert_to_xlsx(df, path: str, sheet_name: str, index: bool = False):
    df.to_excel(path, sheet_name=sheet_name, index=index)
    return path