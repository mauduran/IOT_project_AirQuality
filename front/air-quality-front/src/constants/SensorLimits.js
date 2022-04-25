import { ALERT_LEVELS_TEXT } from "./AirQualityLevels"
import RiskLevelColors from "./RiskLevelColors"

export const getPM25Limits = () => [
    {
        label: ALERT_LEVELS_TEXT.GOOD,
        value: 0,
        color: RiskLevelColors.GOOD
    },
    {
        label: ALERT_LEVELS_TEXT.MODERATE,
        value: 12.1,
        color: RiskLevelColors.MODERATE
    },
    {
        label: ALERT_LEVELS_TEXT.UNHEALTHY_FOR_SENSITIVE_GROUPS,
        value: 35.5,
        color: RiskLevelColors.UNHEALTHY_FOR_SENSITIVE_GROUPS
    },
    {
        label: ALERT_LEVELS_TEXT.UNHEALTHY,
        value: 55.5,
        color: RiskLevelColors.UNHEALTHY,
    },
    {
        label: ALERT_LEVELS_TEXT.VERY_UNHEALTHY,
        value: 150.5,
        color: RiskLevelColors.VERY_UNHEALTHY,
    },
    {
        label: ALERT_LEVELS_TEXT.HAZARDOUS,
        value: 250.5,
        color: RiskLevelColors.HAZARDOUS,
    },
]

export const getPM10Limits = () => [
    {
        label: ALERT_LEVELS_TEXT.GOOD,
        value: 0,
        color: RiskLevelColors.GOOD
    },
    {
        label: ALERT_LEVELS_TEXT.MODERATE,
        value: 55,
        color: RiskLevelColors.MODERATE
    },
    {
        label: ALERT_LEVELS_TEXT.UNHEALTHY_FOR_SENSITIVE_GROUPS,
        value: 155,
        color: RiskLevelColors.UNHEALTHY_FOR_SENSITIVE_GROUPS
    },
    {
        label: ALERT_LEVELS_TEXT.UNHEALTHY,
        value: 255,
        color: RiskLevelColors.UNHEALTHY,
    },
    {
        label: ALERT_LEVELS_TEXT.VERY_UNHEALTHY,
        value: 355,
        color: RiskLevelColors.VERY_UNHEALTHY,
    },
    {
        label: ALERT_LEVELS_TEXT.HAZARDOUS,
        value: 425,
        color: RiskLevelColors.HAZARDOUS,
    },
]

export const getVOCLimits = () => [
    {
        label: ALERT_LEVELS_TEXT.GOOD,
        value: 0,
        color: RiskLevelColors.GOOD
    },
    {
        label: ALERT_LEVELS_TEXT.MODERATE,
        value: 15,
        color: RiskLevelColors.MODERATE
    },
    {
        label: ALERT_LEVELS_TEXT.UNHEALTHY_FOR_SENSITIVE_GROUPS,
        value: 26,
        color: RiskLevelColors.UNHEALTHY_FOR_SENSITIVE_GROUPS
    },
    {
        label: ALERT_LEVELS_TEXT.UNHEALTHY,
        value: 51,
        color: RiskLevelColors.UNHEALTHY,
    },
    {
        label: ALERT_LEVELS_TEXT.VERY_UNHEALTHY,
        value: 76,
        color: RiskLevelColors.VERY_UNHEALTHY,
    },
    {
        label: ALERT_LEVELS_TEXT.HAZARDOUS,
        value: 101,
        color: RiskLevelColors.HAZARDOUS,
    },
]
export const getCO2Limits = () => [
    {
        label: ALERT_LEVELS_TEXT.GOOD,
        value: 400,
        color: RiskLevelColors.GOOD
    },
    {
        label: ALERT_LEVELS_TEXT.MODERATE,
        value: 651,
        color: RiskLevelColors.MODERATE
    },
    {
        label: ALERT_LEVELS_TEXT.UNHEALTHY_FOR_SENSITIVE_GROUPS,
        value: 1501,
        color: RiskLevelColors.UNHEALTHY_FOR_SENSITIVE_GROUPS
    },
    {
        label: ALERT_LEVELS_TEXT.UNHEALTHY,
        value: 2001,
        color: RiskLevelColors.UNHEALTHY,
    },
    {
        label: ALERT_LEVELS_TEXT.VERY_UNHEALTHY,
        value: 2501,
        color: RiskLevelColors.VERY_UNHEALTHY,
    },
    {
        label: ALERT_LEVELS_TEXT.HAZARDOUS,
        value: 5001,
        color: RiskLevelColors.HAZARDOUS,
    },
]