import mongoose from "mongoose";

const Schema = mongoose.Schema;

export type EstabelecimentoDocument = mongoose.Document & {
    nome: string;
};

/**
 * Schema do Tempo de Entrega.
 */
const TempoEntregaSchema = new Schema({
    minimo: {
        type: Number,
    },
    maximo: {
        type: Number,
    }
});

/**
 * Schema de Turno de Horário de Funcionamento.
 */
const TurnoHorarioFuncionamentoSchema = new Schema({
    inicio: {
        type: String,
        trim: true
    },
    fim: {
        type: String,
        trim: true
    }
});

/**
 * Schema de Horário de Funcionamento Semanal.
 */
const HorarioFuncionamentoSemanaSchema = new Schema({
    segundaFeira: [TurnoHorarioFuncionamentoSchema],
    tercaFeira: [TurnoHorarioFuncionamentoSchema],
    quartaFeira: [TurnoHorarioFuncionamentoSchema],
    quintaFeira: [TurnoHorarioFuncionamentoSchema],
    sextaFeira: [TurnoHorarioFuncionamentoSchema],
    sabado: [TurnoHorarioFuncionamentoSchema],
    domingo: [TurnoHorarioFuncionamentoSchema]
});

/**
 * Schema de Subseção de Seção do Cardápio.
 */
const SubSecaoSchema = new Schema({
    nome: {
        type: String,
        trim: true
    }
});

/**
 * Schema de Seção do Cardápio.
 */
const SecaoSchema = new Schema({
    nome: {
        type: String,
        trim: true
    },
    subSecoes: [SubSecaoSchema]
});

const estabelecimentoSchema = new Schema({
    nome: {
        type: String,
        trim: true
    },
    categorias: {
        type: [{
            type: String
        }]
    },
    formasPagamento: {
        type: [{
            type: String
        }]
    },
    telefones: {
        type: [{
            type: String,
            trim: true
        }]
    },
    valorEntrega: {
        type: Number
    },
    tempoEntrega: {
        type: TempoEntregaSchema
    },
    horariosFuncionamento: {
        type: HorarioFuncionamentoSemanaSchema
    },
    secoes: {
        type: [SecaoSchema]
    },
    avaliacao: {
        type: Number
    },
    inadimplente: {
        type: Boolean,
        default: false
    },
    inativo: {
        type: Boolean,
        default: false
    },
    dataCriacao: Date,
    dataEdicao: Date
}, { timestamps: true });

export const Estabelecimento = mongoose.model<EstabelecimentoDocument>("Estabelecimento", estabelecimentoSchema);
