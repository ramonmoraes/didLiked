const nome = 'Ana';
const frase = 'Ramon e Margarida vão a praia. Quem sabe até pegam um sal, heim?. Disse: Manuele.';

const terminaEmA = (nome) => nome.match(/a|á|ã\b/);
const terminaEmLe = (nome) => nome.match(/\w{2}le/);

console.log(terminaEmA('aná'));
