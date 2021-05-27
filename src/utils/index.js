
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


