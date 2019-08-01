export interface IParameter {
    dbParamId: number;
    laenge?: null | number;
    leistVol?: null | number;
    dbParamShorttext: string;
    dbParamLongtext: string;
    arbpl: string;
    werks: number;
    msehCode: string;
    ungWert: number;
    obgWert: number;
    technParm: boolean;
    direktEinst: boolean;
    slayerAggr: string;
    parametersTotal?: number;
    opcTagName: string;
}
