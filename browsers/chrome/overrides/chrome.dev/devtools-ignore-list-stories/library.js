
export function unsafeSetInnerHtml(element, text) {
  element.innerHTML = text;
}

export async function delay() {
  await new Promise((resolve) => window.setTimeout(resolve, 0));
}

export async function unsafeSetInnerHtmlAsync(element, text) {
  await delay();
  element.innerHTML = text;
}


function libraryFunction() {
  throw new Error("whoops");
}


export function throwException() {
  // throw new Error('Why did this happen????');
  try {
  libraryFunction();
} catch (error) {
  console.log("Error ditangani:", error.message);
}
}

export function errorFromRuntime() {
  Map.prototype.set();
}

function ignoredcspviolation() {
  const text = document.getElementById('unsafetext').value;
  const insertionPoint = document.getElementById('inserthere');
  unsafeSetInnerHtml(insertionPoint, text);
}

function doWithError(errorFunc) {
  console.log('No error yet');
  errorFunc();
  console.log('Never happened');
}

export function wrapErrorHandler(errorFunc) {
  function errorWrapper() {
    try {
      errorFunc();
    } catch {
      console.log('Handled an error');
    }
  }
  return errorWrapper;
}

export function wrapErrorHandlerAsync(errorFunc) {
  async function errorWrapper() {
    try {
      await delay();
      await errorFunc();
    } catch {
      console.log('Handled an error');
    }
  }
  return errorWrapper;
}

async function doWithErrorAsync(errorFunc) {
  await delay();
  console.log('No error yet');
  errorFunc();
  console.log('Never happened');
}

function eventHandler() {
  console.log('Handled event');
}

function debuggerStatement() {
  debugger;
}

function fetchBreakpoint() {
  fetch('ignoreme');
}

let clickCount = 0;
const domUpdateElement = document.getElementById('updateme')
function domBreakpoint() {
  clickCount++;
  domUpdateElement.innerText = `Updated ${clickCount} times.`;
}

export function repeat(func, count) {
  const wrapped = () => func();
  function inner() {
    for(let i = 0; i < count; i++) {
      wrapped();
    }
  }
  inner();
}

export function repeatTwo(func, func2, count) {
  const wrapped = () => func();
  function inner() {
    for(let i = 0; i < count; i++) {
      wrapped();
      func2();
    }
  }
  inner();
}

export async function repeatTwoAsync(func, func2, count) {
  const wrapped = () => func();
  async function inner() {
    for(let i = 0; i < count; i++) {
      wrapped();
      await delay();
      func2();
      await delay();
    }
  }
  await delay();
  await inner();
}


document.getElementById('ignoredhandler').onclick = eventHandler;
document.getElementById('allignored').onclick = () => doWithError(throwException);
document.getElementById('allignoredasync').onclick = async () => doWithError(throwException);
document.getElementById('allignoredruntime').onclick = () => doWithError(errorFromRuntime);
document.getElementById('ignoredcsp').onclick = ignoredcspviolation;
document.getElementById('debuggerstatement').onclick = debuggerStatement;
document.getElementById('fetchbreakpoint').onclick = fetchBreakpoint;
document.getElementById('dombreakpoint').onclick = domBreakpoint;
document.getElementById('dombreakpointnostack').onclick = domUpdateElement.append.apply.bind(domUpdateElement.append, domUpdateElement, [' Clicked.']);

window.debuggerstatement = debuggerStatement;
window.fetchbreakpoint = fetchBreakpoint;
window.dombreakpoint = domBreakpoint;
