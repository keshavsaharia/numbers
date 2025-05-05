import { FP8 } from "@/data/fp8";
import { Divider, Interactive } from "../number/interactive";
import { SubnormalValueFormula, NormalizedValueFormula } from "./formula";
import { FPFormatName } from "./instructions";
import { SpecificationMetric, WithThreeCases, ThreeCases, WithTwoCases, CaseText, TwoCases, FPBitSpecification, FPExponentRange } from "./specification";
import { code as CodeText } from "../typography";

export function FP8Specification({ fp }: { fp: FP8 }) {

  return (
      <Interactive instructions={<>
          <FPFormatName name={ fp.id }/>

      </>}>
        <FPBitSpecification fp={ fp }/>
        <FPExponentRange fp={ fp }/>
        <Divider/>
        <WithTwoCases left={<p>
            sign bit <CodeText className='text-red-500'>s</CodeText>
        </p>} right={<p>
            mantissa <CodeText className='text-blue-500'>m</CodeText>
        </p>}>
            given an exponent <CodeText className='text-green-500'>e</CodeText>
        </WithTwoCases>
        
        <TwoCases
            // subnormal numbes and zero
            first={<>
            <WithTwoCases>
                <CaseText variable='e' operator='=' value={0}/>
            </WithTwoCases>
            <TwoCases first={<>
                <CaseText variable='m' operator='=' value={0} comment={ fp.unsignedZero ? 'zero' : 'signed zero' }/>
                <span className='flex justify-center align-middle'>
                    { !fp.unsignedZero && <span className="text-red-500">&plusmn;</span> }
                    <span className="text-xl">0</span>
                </span>
            </>}
            // normal numbers, nan, infinity
            second={<>
                <CaseText variable='m' operator='>' value={0} comment='subnormal'/>
                <SubnormalValueFormula fp={ fp }/>
            </>}/>
        </>}
        second={<>
            <CaseText variable='e' operator='>' value={0}/>
            
            <TwoCases first={<>
                <CaseText variable='m' operator='<' value={ fp.range - 1 } comment='normalized value'/>
                <NormalizedValueFormula fp={ fp }/>
            </>} second={<>
                <NormalizedValueFormula fp={ fp }/>
            </>}/>
        </>}/>
      </Interactive>
  )
}


// { isFp8 ? 
//   <TwoCases first={
//       <CaseText variable='m' operator='<' value={<>{ (fp.range - BigInt(1)).toString() } </>} comment='signed infinity'/>
//   } second={<>
//       <CaseText variable='m' operator='=' value={(fp.range as number) - 1} comment='not a number'/>
//       <span className='flex justify-center align-middle'>
//           <span className="text-red-500">&plusmn;</span>
//           <span className="text-lg">NaN</span>
//       </span>
//   </>} /> 
// :   

// third={<>
//     <WithTwoCases>
//         <CaseText variable='e' operator='=' value={<>E<sub>max</sub></>}/>
//     </WithTwoCases>
//     <TwoCases first={<>
//         <CaseText variable='m' operator='=' value={0} comment='signed infinity'/>
//         <span className='flex justify-center align-middle'>
//             <span className="text-red-500">&plusmn;</span>
//             <span className="text-2xl">&infin;</span>
//         </span>
//     </>} second={<>
//         <CaseText variable='m' operator='>' value={0} comment='not a number'/>
//         <span>NaN</span>
//     </>}/>
// </>}