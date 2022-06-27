const incstr = require("incstr");
const loaderUtils = require("loader-utils");
const path = require("path");

const createUniqueIdGenerator = () => {
  const uniqIds = {};
  const generateNextId = incstr.idGenerator({
    alphabet: "abcefghijklmnopqrstuvwxyzABCEFGHJKLMNOPQRSTUVWXYZ"
  });

  return name => {
    if (!uniqIds[name]) {
      uniqIds[name] = generateNextId();
    }

    return uniqIds[name];
  };
};

const localNameIdGenerator = createUniqueIdGenerator();
const componentNameIdGenerator = createUniqueIdGenerator();

module.exports = (localName, context) => {
  const componentName = context.resourcePath.split("/").slice(-2, -1)[0];
  const localId = localNameIdGenerator(localName);
  const componentId = componentNameIdGenerator(componentName);
  const hash = loaderUtils.getHashDigest(
    path.posix.relative(context.rootContext, context.resourcePath) + localName,
    "md5",
    "base64",
    3
  );

  return `${componentId}_${localId}_${hash}`;
};
