const mainNav = require("./navigation/mainNav.json5");
const headerNav = require("./navigation/headerNav.json5");

function findTopLinkRecordFor(url) {
  return mainNav.links.find(link => {
    if (link.url === url) { return true; }

    if (link.children) {
      return link.children.some(child => {
        if (child.url === url) return true;

        return child.children && child.children.some(grandchild => grandchild.url === url);
      });
    }

    return false;
  });
}

const mainNavObj = {
  ...mainNav,
  links: mainNav.links.map(link => ({
    ...link,
    hasChildren: link.children && link.children.length > 0,
    children: link.children?.map(child => ({
      ...child,
      hasChildren: child.children && child.children.length > 0,
      children: child.children || []
    }))
  })),
  getActiveParentLink(pageUrlRendering) {
    return findTopLinkRecordFor(pageUrlRendering);
  }
};

const headerNavObj = {
  ...headerNav,
  getActiveParentLink(pageUrlRendering) {
    return findTopLinkRecordFor(pageUrlRendering);
  }
};

module.exports = {
  mainNav: mainNavObj,
  headerNav: headerNavObj
};