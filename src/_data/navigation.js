const mainNav = require("../_data/navigation/mainNav.json");
const headerNav = require("../_data/navigation/headerNav.json");
const footerLinks = require("../_data/navigation/footerLinks.json");

function findTopLinkRecordFor(url, navLinks) {
  return navLinks.find((link) => {
    if (link.url === url) return true;
    if (link.children) {
      return link.children.some(
        (child) => child.url === url || (child.children && child.children.some((grandchild) => grandchild.url === url))
      );
    }
    return false;
  });
}

const mainNavObj = {
  ...mainNav,
  links: mainNav.links.map((link) => ({
    ...link,
    hasChildren: link.children && link.children.length > 0,
    children: link.children?.map((child) => ({
      ...child,
      hasChildren: child.children && child.children.length > 0,
      children: child.children || [],
    })),
  })),
  getActiveParentLink(pageUrlRendering) {
    return findTopLinkRecordFor(pageUrlRendering, mainNav.links);
  },
};

const headerNavObj = {
  ...headerNav,
  getActiveParentLink(pageUrlRendering) {
    return findTopLinkRecordFor(pageUrlRendering, headerNav.links);
  },
};

const footerNavObj = {
  ...footerLinks,
};

module.exports = {
  mainNav: mainNavObj,
  headerNav: headerNavObj,
  footerNav: footerNavObj,
};
