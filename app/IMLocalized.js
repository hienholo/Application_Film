import memoize from "lodash.memoize";
import i18n from "i18n-js";
import * as Localization from "expo-localization";
import { I18nManager, Platform } from "react-native";

export const translationGetters = {
  "en-US": () => require("./languages/en.json"),
 
};

export const translationGettersIOS = {
  en: () => require("./languages/en.json"),
 
};

export const IMLocalized = memoize(
  (key, config) =>
    i18n.t(key, config).includes("missing") ? key : i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);


