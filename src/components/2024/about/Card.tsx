const design = {
    edge: '/about/card_details/InternEdge.svg',
    design: '/about/card_details/InternX.svg',

} 
function Users({className}){
    return(
        <>
            <h1 className='absolute left-[50%]'>Hello</h1>
            <img className='absolute left-[50%]' src="/about/bgremove.png" alt="" />
            <h2 className='left-[50%] top-[50%]'>Kourai</h2>
        </>
    );
}



function CardDesign({ className }) {
    return (
        <>
            <img className={className} src={design.edge} alt="" />
            <img className={className} src={design.design} alt="" />
        </>
    );
}

export default function UserCard(){
    return(
        <div className="h-[700px] w-[432.8px] relative">
            <img className='absolute h-[654.85px] w-[325.5] left-[53.7px] top-[45.15px]' src="/about/card.svg" alt="" />
            <CardDesign className='absolute h-[654.85px] w-[325.5] left-[53.7px] top-[45.15px]'/>
            <h1 className='absolute left-[50%]'>Hello</h1>
            <img className='absolute w-[325.5px] left-[52.7px] top-[50%]' src="/about/bgremove.png" alt="" />
            <h2 className='absolute left-[50%] top-[50%]'>Kourai</h2>
            <img className='absolute h-[200.5px] w-auto top-[499.5px]' src="/about/BottomPart.svg" alt="" />
            <img className='absolute h-[700px] w-[185.42px] left-[246.98px]'  src="/about/RightPart.svg" alt="" />
        </div>
    )
};

