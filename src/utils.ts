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
