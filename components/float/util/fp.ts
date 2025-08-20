type Bit = 0 | 1

export function parseBits(bits: Bit[]): BigInt {
    const binaryStr = bits.join('');
    const decimalStr = convertBase(binaryStr, 2, 10);
    return BigInt(decimalStr);
}

function parseBigInt(bigint: string, base: number): number[] {
    //convert bigint string to array of digit values
    const values: number[] = [];
    for (let i = 0; i < bigint.length; i++) {
      values[i] = parseInt(bigint.charAt(i), base);
    }
    return values;
}
  
function formatBigInt(values: number[], base: number): string {
    //convert array of digit values to bigint string
    let bigint = '';
    for (let i = 0; i < values.length; i++) {
      bigint += values[i].toString(base);
    }
    return bigint;
}
  
function convertBase(bigint: string, inputBase: number, outputBase: number): string {
    //takes a bigint string and converts to different base
    const inputValues = parseBigInt(bigint, inputBase);
    const outputValues: number[] = []; //output array, little-endian/lsd order
    let remainder: number;
    const len = inputValues.length;
    let pos = 0;
    let i: number;

    // while digits left in input array
    while (pos < len) { 
      remainder = 0; //set remainder to 0
      for (i = pos; i < len; i++) {
        //long integer division of input values divided by output base
        //remainder is added to output array
        remainder = inputValues[i] + remainder * inputBase;
        inputValues[i] = Math.floor(remainder / outputBase);
        remainder -= inputValues[i] * outputBase;
        if (inputValues[i] === 0 && i === pos) {
          pos++;
        }
      }
      outputValues.push(remainder);
    }
    outputValues.reverse(); //transform to big-endian/msd order
    return formatBigInt(outputValues, outputBase);
}