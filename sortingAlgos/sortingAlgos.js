const arrayInicial = [234, 196, 10, 160, 157, 221, 22, 181, 253, 92, 147, 121, 239, 8, 87, 167, 183, 136, 25, 259, 46, 188, 104, 70, 252, 71, 53, 27, 166, 187, 65, 282, 248, 28, 237, 12, 76, 98, 11, 249, 169, 251, 58, 119, 77, 114, 177, 150, 158, 149, 199, 23, 241, 91, 72, 122, 4, 38, 204, 283, 218, 178, 154, 242, 229, 270, 243, 279, 79, 264, 107, 220, 295, 124, 41, 103, 228, 81, 146, 255, 95, 43, 33, 186, 210, 281, 51, 289, 17, 129, 30, 127, 161, 266, 222, 37, 184, 32, 293, 190, 284, 50, 138, 152, 194, 195, 34, 39, 66, 26, 265, 67, 226, 13, 285, 14, 120, 299, 35, 96, 215, 244, 176, 217, 88, 40, 109, 63, 106, 60, 214, 7, 171, 97, 56, 216, 75, 208, 100, 142, 175, 276, 163, 202, 47, 83, 278, 19, 133, 141, 256, 151, 108, 271, 73, 245, 203, 258, 231, 294, 31, 290, 112, 238, 164, 213, 68, 15, 130, 247, 300, 52, 99, 240, 292, 174, 135, 89, 254, 291, 153, 201, 132, 118, 155, 82, 110, 227, 180, 268, 165, 233, 3, 193, 198, 74, 267, 125, 105, 246, 116, 277, 235, 272, 93, 257, 78, 144, 123, 269, 21, 159, 223, 207, 45, 156, 9, 29, 261, 206, 54, 189, 1, 148, 128, 274, 200, 18, 275, 111, 102, 59, 62, 192, 168, 162, 211, 20, 170, 191, 117, 6, 61, 55, 139, 143, 263, 5, 2, 197, 42, 182, 86, 101, 232, 16, 57, 205, 90, 172, 209, 250, 179, 273, 115, 36, 113, 64, 296, 280, 44, 212, 145, 286, 84, 137, 185, 225, 69, 287, 24, 94, 80, 224, 48, 131, 236, 260, 134, 298, 173, 230, 288, 297, 262, 85, 49, 126, 219, 140];

function bubbleSort(array) {
  const arrayDesordenado = [...array];

  for (let numeroIteracao = 1; numeroIteracao < arrayDesordenado.length; numeroIteracao++) {
    for (let numeroJanela = 0; numeroJanela < arrayDesordenado.length - 1; numeroJanela++) {
      if (arrayDesordenado[numeroJanela] > arrayDesordenado[numeroJanela + 1]) {
        const temporario = arrayDesordenado[numeroJanela];
        arrayDesordenado[numeroJanela] = arrayDesordenado[numeroJanela + 1];
        arrayDesordenado[numeroJanela + 1] = temporario;
      }
    }
  }

  return arrayDesordenado;
}

const startTime = performance.now();
const arrayOrdenado = bubbleSort(arrayInicial);
const endTime = performance.now();

console.log(`Esse é meu array ordenado [${arrayOrdenado}]`);
console.log(`Tempo de execução: ${endTime - startTime} milissegundos`);


// if(arrayDesordenado[1] > arrayDesordenado[2] ) {
//   const temporario = arrayDesordenado[1];// arrayDesordenado = [2, 8, 5, 3, 9, 4, 4, 1]; temporario = 8;
//   arrayDesordenado[1] = arrayDesordenado[2]; // arrayDesordenado =  [2, 5, 5, 3, 9, 4, 4, 1]; temporario = 8;
//   arrayDesordenado[2] = temporario;// arrayDesordenado = [2, 5, 8, 3, 9, 4, 4, 1]; temporario = 8;
// }