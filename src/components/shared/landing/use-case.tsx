import MaxContainer from "../common/maxcontainer";
import Tumb from "../icons/tumb"
import Dia from "../icons/dia"
import Folder from "@/components/shared/icons/folder";


const UseCase = () => {
    const useCases = [
        {
            icons: <Tumb className="mb-[3.1rem] w-[28rem] h-fit" />,
            title: "Info",
            description: <>Complete <br></br> Financial Analytics</>,
        },
        {
            icons: <Dia className="w-[22.7rem] mt-[11.2rem] h-[29.2rem] mb-[8.5rem]" />,
            title: "Heavy Duty",
            description: "Bulk Multi-Chain Analysis",
        },
        {
            icons: <Folder className="w-[26rem] h-fit mb-[10rem]" />,
            title: "Speed",
            description: "Professional Portfolio Reports",
        },
    ]

    return (
        <div className="sm:mt-[50rem] sm:px-[7rem] px-[2rem]">
            <MaxContainer className="flex flex-col justify-between sm:flex-row gap-[3rem]">
                {
                    useCases.map((item, index) => {
                        return (
                            <div className="" key={index}>
                                {item.icons}
                                <p className="text-[1.4rem] text-center text-[#7EF9FF]">{item.title}</p>
                                <p className="font-[400] text-[2.8rem] text-white text-center mx-auto max-w-[25rem]">{item.description}</p>
                            </div>
                        )
                    })
                }
            </MaxContainer>
        </div>
    );
}

export default UseCase;