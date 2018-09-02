let baseUrl = '';
let routerMode = 'hash';
let baseImgPath;

if(process.env.NODE_ENV == 'development'){
    
    baseUrl = 'linTest';
    baseImgPath = 'linTest/img';
}

export {
    baseUrl,
    baseImgPath,
    routerMode
}