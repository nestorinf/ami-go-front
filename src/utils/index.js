
export const loadStore = (folderPrincipal) => {
    // const path = `{__dirname}/${folderPrincipal}`
    const context = require.context(__dirname + '/' + folderPrincipal, true, /\.js$/i)
    const contextFile = context.keys()
    const modules = {}
    contextFile.map((e) => {
        const nested = e.replaceAll(/(index)|(.js|.ts)\b|[.,/]/g, '')
        modules[nested] = require(__dirname + '/' + folderPrincipal + nested).default
    })
    return modules
}

export const handleMessage = (message, status, refs) => {
    switch (status) {
        case 422:
            refs.$refs.snackBarRef.changeStatusSnackbar(true);
            refs.textSnackBar = message;
            break;
        
        case 200:
            refs.$refs.snackBarRef.changeStatusSnackbar(true);
            refs.textSnackBar = message;
            break;
        
        case 403:
            refs.$refs.snackBarRef.changeStatusSnackbar(true);
            refs.textSnackBar = message;
            break;

        default:
            refs.$refs.snackBarRef.changeStatusSnackbar(true);
            refs.textSnackBar = "Disculpe, ha ocurrido un error";
          break;
      }
}