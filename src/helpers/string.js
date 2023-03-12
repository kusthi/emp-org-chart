import { searchTypes } from '../constants';

export function findItemsInList(searchText, list, props) {
  /* if partial results are also preferred even though we have exact hits, 
      then this call and the respective branch in return st can be removed
      since an exact match is also an partial match */
  const exactMatchResult = list.filter(item =>
    isMatchFound(searchText, item, props, searchTypes.exact)
  );
  const partialMatchResult = list.filter(item =>
    isMatchFound(searchText, item, props, searchTypes.partial)
  );
  return exactMatchResult.length > 0 ? exactMatchResult : partialMatchResult;
}

function isMatchFound(text, item, props, searchType) {
  return props.some(prop => {
    const propVal = item[prop];
    if (searchType === searchTypes.exact) {
      return text === propVal;
    }

    const searchTxtsubStrs = getCaseNormalizedSubStrings(text);
    const propValSubStrs = getCaseNormalizedSubStrings(propVal);
    return propValSubStrs.some(propValSubStr =>
      searchTxtsubStrs.some(searchTxtsubStr =>
        propValSubStr.startsWith(searchTxtsubStr)
      )
    );
  });
}

function getCaseNormalizedSubStrings(stringVal) {
  return stringVal.toLowerCase().split(' ');
}
