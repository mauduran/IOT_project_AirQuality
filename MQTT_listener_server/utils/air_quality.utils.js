const { VOC_QUALITY_LEVELS } = require("../constants/voc_quality_levels");
const { CO2_QUALITY_LEVELS } = require("../constants/co2_quality_levels");
const { PM10_QUALITY_LEVELS } = require("../constants/pm10_quality_levels");
const { PM25_QUALITY_LEVELS } = require("../constants/pm25_quality_level");
const { AIR_QUALITY_CATEGORIES } = require("../constants/airquality_categories");

const getCO2QualityLevel = (value) => {
    if (value <= CO2_QUALITY_LEVELS.GOOD)
        return AIR_QUALITY_CATEGORIES.GOOD;

    if (value <= CO2_QUALITY_LEVELS.MODERATE)
        return AIR_QUALITY_CATEGORIES.MODERATE;

    if (value <= CO2_QUALITY_LEVELS.UNHEALTHY_FOR_SENSITIVE_GROUPS)
        return AIR_QUALITY_CATEGORIES.UNHEALTHY_FOR_SENSITIVE_GROUPS;

    if (value <= CO2_QUALITY_LEVELS.UNHEALTHY)
        return AIR_QUALITY_CATEGORIES.UNHEALTHY;

    if (value <= CO2_QUALITY_LEVELS.VERY_UNHEALTHY)
        return AIR_QUALITY_CATEGORIES.VERY_UNHEALTHY;

    if (value <= CO2_QUALITY_LEVELS.HAZARDOUS)
        return AIR_QUALITY_CATEGORIES.HAZARDOUS;

    return AIR_QUALITY_CATEGORIES.UNDEFINED;
}

const getPM25QualityLevel = (value) => {
    if (value <= PM25_QUALITY_LEVELS.GOOD)
        return AIR_QUALITY_CATEGORIES.GOOD;

    if (value <= PM25_QUALITY_LEVELS.MODERATE)
        return AIR_QUALITY_CATEGORIES.MODERATE;

    if (value <= PM25_QUALITY_LEVELS.UNHEALTHY_FOR_SENSITIVE_GROUPS)
        return AIR_QUALITY_CATEGORIES.UNHEALTHY_FOR_SENSITIVE_GROUPS;

    if (value <= PM25_QUALITY_LEVELS.UNHEALTHY)
        return AIR_QUALITY_CATEGORIES.UNHEALTHY;

    if (value <= PM25_QUALITY_LEVELS.VERY_UNHEALTHY)
        return AIR_QUALITY_CATEGORIES.VERY_UNHEALTHY;

    if (value <= PM25_QUALITY_LEVELS.HAZARDOUS)
        return AIR_QUALITY_CATEGORIES.HAZARDOUS;

    return AIR_QUALITY_CATEGORIES.UNDEFINED;
}

const getPM10QualityLevel = (value) => {
    if (value <= PM10_QUALITY_LEVELS.GOOD)
        return AIR_QUALITY_CATEGORIES.GOOD;

    if (value <= PM10_QUALITY_LEVELS.MODERATE)
        return AIR_QUALITY_CATEGORIES.MODERATE;

    if (value <= PM10_QUALITY_LEVELS.UNHEALTHY_FOR_SENSITIVE_GROUPS)
        return AIR_QUALITY_CATEGORIES.UNHEALTHY_FOR_SENSITIVE_GROUPS;

    if (value <= PM10_QUALITY_LEVELS.UNHEALTHY)
        return AIR_QUALITY_CATEGORIES.UNHEALTHY;

    if (value <= PM10_QUALITY_LEVELS.VERY_UNHEALTHY)
        return AIR_QUALITY_CATEGORIES.VERY_UNHEALTHY;

    if (value <= PM10_QUALITY_LEVELS.HAZARDOUS)
        return AIR_QUALITY_CATEGORIES.HAZARDOUS;

    return AIR_QUALITY_CATEGORIES.UNDEFINED;
}

const getVOCQualityLevel = (value) => {
    if (value <= VOC_QUALITY_LEVELS.GOOD)
        return AIR_QUALITY_CATEGORIES.GOOD;

    if (value <= VOC_QUALITY_LEVELS.MODERATE)
        return AIR_QUALITY_CATEGORIES.MODERATE;

    if (value <= VOC_QUALITY_LEVELS.UNHEALTHY_FOR_SENSITIVE_GROUPS)
        return AIR_QUALITY_CATEGORIES.UNHEALTHY_FOR_SENSITIVE_GROUPS;

    if (value <= VOC_QUALITY_LEVELS.UNHEALTHY)
        return AIR_QUALITY_CATEGORIES.UNHEALTHY;

    if (value <= VOC_QUALITY_LEVELS.VERY_UNHEALTHY)
        return AIR_QUALITY_CATEGORIES.VERY_UNHEALTHY;

    if (value <= VOC_QUALITY_LEVELS.HAZARDOUS)
        return AIR_QUALITY_CATEGORIES.HAZARDOUS;

    return AIR_QUALITY_CATEGORIES.UNDEFINED;
}

module.exports = {
    getVOCQualityLevel,
    getPM10QualityLevel,
    getPM25QualityLevel,
    getCO2QualityLevel,
} 