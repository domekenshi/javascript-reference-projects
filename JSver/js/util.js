/**
 * HTML要素に属性を設定
 */
export const setAttribute = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};
