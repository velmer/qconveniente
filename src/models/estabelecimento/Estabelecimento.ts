import mongoose, { Document, Schema } from "mongoose";
import Constantes from "../../util/constantes";
import MensagensErro from "../../util/MensagensErro";

/**
 * Document do Tempo de Entrega.
 */
interface TempoEntregaDocument extends Document {
    minimo: number;
    maximo: number;
}

/**
 * Document de Turno de Horário de Funcionamento.
 */
interface TurnoHorarioFuncionamentoDocument extends Document {
    inicio: string;
    fim: string;
}

/**
 * Document de Horário de Funcionamento Semanal.
 */
interface HorarioFuncionamentoSemanaDocument extends Document {
    segundaFeira: TurnoHorarioFuncionamentoDocument[];
    tercaFeira: TurnoHorarioFuncionamentoDocument[];
    quartaFeira: TurnoHorarioFuncionamentoDocument[];
    quintaFeira: TurnoHorarioFuncionamentoDocument[];
    sextaFeira: TurnoHorarioFuncionamentoDocument[];
    sabado: TurnoHorarioFuncionamentoDocument[];
    domingo: TurnoHorarioFuncionamentoDocument[];
}

/**
 * Document de Subseção de Seção do Cardápio.
 */
interface SubSecaoDocument extends Document {
    nome: string;
}

/**
 * Document de Seção do Cardápio.
 */
interface SecaoDocument extends Document {
    nome: string;
    subSecoes: SubSecaoDocument[];
}

/**
 * Document do Estabelecimento.
 */
export interface EstabelecimentoDocument extends Document {
    nome: string;
    categorias: string[];
    formasPagamento: string[];
    telefones: string[];
    valorEntrega: number;
    tempoEntrega: TempoEntregaDocument;
    horariosFuncionamento: HorarioFuncionamentoSemanaDocument;
    secoes: SecaoDocument[];
    avaliacao: number;
    inadimplente: boolean;
    inativo: boolean;
    criadoEm: Date;
    atualizadoEm: Date;
};

/**
 * Schema do Tempo de Entrega.
 */
const TempoEntregaSchema = new Schema({
    minimo: {
        type: Number,
        required: [true, MensagensErro.ESTABELECIMENTO.TEMPO_MINIMO_ENTREGA_OBRIGATORIO]
    },
    maximo: {
        type: Number,
        required: [true, MensagensErro.ESTABELECIMENTO.TEMPO_MAXIMO_ENTREGA_OBRIGATORIO]
    }
});

/**
 * Schema de Turno de Horário de Funcionamento.
 */
const TurnoHorarioFuncionamentoSchema = new Schema({
    inicio: {
        type: String,
        required: [true, MensagensErro.ESTABELECIMENTO.INICIO_HORARIO_FUNCIONAMENTO_OBRIGATORIO],
        /* Formato hhMM, para facilitar operações, verificações e aplicação de máscara */
        match: [Constantes.REGEX.HORA_SEM_PONTUACAO, MensagensErro.ESTABELECIMENTO.INICIO_HORARIO_FUNCIONAMENTO_INVALIDO],
        trim: true
    },
    fim: {
        type: String,
        required: [true, MensagensErro.ESTABELECIMENTO.FIM_HORARIO_FUNCIONAMENTO_OBRIGATORIO],
        /* Formato hhMM, para facilitar operações, verificações e aplicação de máscara */
        match: [Constantes.REGEX.HORA_SEM_PONTUACAO, MensagensErro.ESTABELECIMENTO.FIM_HORARIO_FUNCIONAMENTO_INVALIDO],
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
        minlength: [Constantes.ESTABELECIMENTO.NOME_SUBSECAO_TAMANHO_MINIMO,
            MensagensErro.ESTABELECIMENTO.NOME_SUBSECAO_TAMANHO_MINIMO],
        maxlength: [Constantes.ESTABELECIMENTO.NOME_SUBSECAO_TAMANHO_MAXIMO,
            MensagensErro.ESTABELECIMENTO.NOME_SUBSECAO_TAMANHO_MAXIMO],
        required: [true, MensagensErro.ESTABELECIMENTO.NOME_SUBSECAO_OBRIGATORIO],
        trim: true
    }
});

/**
 * Schema de Seção do Cardápio.
 */
const SecaoSchema = new Schema({
    nome: {
        type: String,
        minlength: [Constantes.ESTABELECIMENTO.NOME_SECAO_TAMANHO_MINIMO,
            MensagensErro.ESTABELECIMENTO.NOME_SECAO_TAMANHO_MINIMO],
        maxlength: [Constantes.ESTABELECIMENTO.NOME_SECAO_TAMANHO_MAXIMO,
            MensagensErro.ESTABELECIMENTO.NOME_SECAO_TAMANHO_MAXIMO],
        required: [true, MensagensErro.ESTABELECIMENTO.NOME_SECAO_OBRIGATORIO],
        trim: true
    },
    subSecoes: [SubSecaoSchema]
});

/**
 * Schema do Estabelecimento.
 */
const EstabelecimentoSchema = new Schema({
    nome: {
        type: String,
        minlength: [Constantes.ESTABELECIMENTO.NOME_SECAO_TAMANHO_MINIMO,
            MensagensErro.ESTABELECIMENTO.NOME_TAMANHO_MINIMO],
        maxlength: [Constantes.ESTABELECIMENTO.NOME_SECAO_TAMANHO_MAXIMO,
            MensagensErro.ESTABELECIMENTO.NOME_TAMANHO_MAXIMO],
        required: [true, MensagensErro.ESTABELECIMENTO.NOME_OBRIGATORIO],
        trim: true
    },
    categorias: {
        type: [{
            type: String,
            enum: {
                values: Object.values(Constantes.ESTABELECIMENTO.CATEGORIAS),
                message: MensagensErro.ESTABELECIMENTO.CATEGORIA_INVALIDA
            }
        }],
        required: [true, MensagensErro.ESTABELECIMENTO.CATEGORIA_OBRIGATORIA]
    },
    formasPagamento: {
        type: [{
            type: String,
            enum: {
                values: Constantes.ESTABELECIMENTO.FORMAS_PAGAMENTO,
                message: MensagensErro.ESTABELECIMENTO.FORMA_PAGAMENTO_INVALIDA
            }
        }],
        required: [true, MensagensErro.ESTABELECIMENTO.FORMA_PAGAMENTO_OBRIGATORIA]
    },
    telefones: {
        type: [{
            type: String,
            /* Aceita os formatos XX9XXXXXXXX ou XXXXXXXXXX (Sem máscara e espaços) */
            match: [Constantes.REGEX.TELEFONE_SEM_PONTUACAO, MensagensErro.ESTABELECIMENTO.TELEFONE_INVALIDO],
            trim: true
        }],
        required: [true, MensagensErro.ESTABELECIMENTO.TELEFONE_OBRIGATORIO]
    },
    valorEntrega: {
        type: Number,
        required: [true, MensagensErro.ESTABELECIMENTO.VALOR_ENTREGA_OBRIGATORIO]
    },
    tempoEntrega: {
        type: TempoEntregaSchema,
        required: [true, MensagensErro.ESTABELECIMENTO.TEMPO_ENTREGA_OBRIGATORIO]
    },
    horariosFuncionamento: {
        type: HorarioFuncionamentoSemanaSchema,
        required: [true, MensagensErro.ESTABELECIMENTO.HORARIO_FUNCIONAMENTO_OBRIGATORIO]
    },
    secoes: {
        type: [SecaoSchema]
    },
    avaliacao: {
        type: Number,
        min: [Constantes.ESTABELECIMENTO.AVALIACAO_MINIMA, MensagensErro.ESTABELECIMENTO.AVALIACAO_MINIMA],
        max: [Constantes.ESTABELECIMENTO.AVALIACAO_MAXIMA, MensagensErro.ESTABELECIMENTO.AVALIACAO_MAXIMA],
    },
    inadimplente: {
        type: Boolean,
        default: false
    },
    inativo: {
        type: Boolean,
        default: false
    }
}, { timestamps: { createdAt: "criadoEm", updatedAt: "atualiadoEm" } });

export const Estabelecimento = mongoose.model<EstabelecimentoDocument>("Estabelecimento", EstabelecimentoSchema);
