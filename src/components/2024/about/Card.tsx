const design = {
    edge: '/about/card_details/InternEdge.svg',
    design: '/about/card_details/InternX.svg',

} 

function CardDesign({className}){
    return (
        <div className={className}>
            <img className="absolute h-full w-full" src={design.edge} alt="" />
            <img className=" h-full w-full" src={design.design} alt="" />
        </div>
    )
}
export default function UserCard(){
    return(
        <div className="h-[700px] w-[432.8px] relative">
            <img className='absolute h-[654.85px] w-[325.5] left-[53.7px] top-[45.15px]' src="/about/card.svg" alt="" />
            <CardDesign className='absolute h-[654.85px] w-[325.5] left-[53.7px] top-[45.15px]'/>
            <img className='absolute h-[200.5px] w-auto top-[499.5px]' src="/about/BottomPart.svg" alt="" />
            <img className='absolute h-[700px] w-[185.42px] left-[246.98px]'  src="/about/RightPart.svg" alt="" />
        </div>
    )
};

