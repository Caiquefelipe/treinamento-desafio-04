class Calculadora {
    private display: HTMLInputElement;
    private expressao: string = '';
    private numeros: (string | number)[] = []; // Usando um array de tipo misto para armazenar operadores e números

    constructor() {
        this.display = document.getElementById('display') as HTMLInputElement;
        this.adicionarEventListeners();
    }

    private atualizarDisplay(valor: string): void {
        this.display.value = valor;
    }

    private adicionarEventoBotaoClicado(valor: string) {
        if (valor === '=') {
            this.calcularExpressao();
        } else if (valor === 'C') {
            this.expressao = '';
            this.atualizarDisplay('');
            this.numeros = [];
        } else if (valor === 'Apagar') {
            if (this.expressao.length > 0) {
                const ultimoCaractere = this.expressao.slice(-1);
                if (ultimoCaractere.match(/[0-9]/)) {
                    this.numeros.pop();
                }
                this.expressao = this.expressao.slice(0, -1);
                this.atualizarDisplay(this.expressao);
            }
        } else {
           if (valor.match(/[0-9+\-*/]/)) {
                this.expressao += valor;
                this.atualizarDisplay(this.expressao);
                if (valor.match(/[0-9]/)) {
                    this.numeros.push(parseFloat(valor));
                } else { 
                    this.numeros.push(valor);
                }
            }
        }
    }

    private calcularExpressao(): void {
        try {
            const resultado = eval(this.expressao);
            this.expressao = resultado.toString();
            this.atualizarDisplay(this.expressao);
            console.log("Expressao: ");
            console.log(this.numeros);
        } catch (error) {
            this.expressao = '';
            this.atualizarDisplay('Erro');
        }
    }

    private adicionarEventListeners(): void {
        const botoes = document.querySelectorAll('button[data-value]');
        botoes.forEach(botao => {
            botao.addEventListener('click', () => {
                const valor = botao.getAttribute('data-value');
                if (valor === null) return;
                this.adicionarEventoBotaoClicado(valor);
            });
        });

        window.addEventListener('keydown', (event) => {
            const tecla = event.key;
            if (tecla === 'Enter') {
                this.calcularExpressao();
            } else if (tecla === 'Escape') {
                this.expressao = '';
                this.atualizarDisplay('');
                this.numeros = [];
            } else if (tecla === 'Delete' || tecla === 'Backspace') {
                if (this.expressao.length > 0) {
                    const ultimoCaractere = this.expressao.slice(-1);
                    if (ultimoCaractere.match(/[0-9]/)) {
                        this.numeros.pop();
                    }
                    this.expressao = this.expressao.slice(0, -1);
                    this.atualizarDisplay(this.expressao);
                }
            } else if (tecla.match(/[0-9+\-*/]/)) {
                this.expressao += tecla;
                this.atualizarDisplay(this.expressao);
                if (tecla.match(/[0-9]/)) {
                    this.numeros.push(parseFloat(tecla));
                } else {
                    this.numeros.push(tecla);
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Calculadora();
});
