export const bem = (baseClass: string, mods: Record<string, string | string[] | boolean>) => {
  const keys = Object.keys(mods);
  const res: string[] = [];

  keys.forEach((key) => {
    const param = mods[key];
    if (!param) return;

    if (Array.isArray(param)) {
      param.forEach((item) => {
        res.push(`${baseClass}_${key}-${item}`);
      });
    } else {
      const mod = typeof param === 'boolean' ? key : `${key}-${param}`;
      res.push(`${baseClass}_${mod}`);
    }
  });
  return [baseClass, res];
};

function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    const msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
export async function copyTextToClipboard(text: string) {
  if (!navigator.clipboard) {
    return fallbackCopyTextToClipboard(text);
  }
  return navigator.clipboard.writeText(text);
}
