export const getParamFromUrl = (paramName)=> {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(paramName)
}

