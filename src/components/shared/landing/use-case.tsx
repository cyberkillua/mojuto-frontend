import MaxContainer from "../common/maxcontainer";
import Tumb from "../icons/tumb"
import Dia from "../icons/dia"
import Folder from "@/components/shared/icons/folder";


const UseCase = () => {
    const useCases = [
        {
            icons: <Tumb className="sm:mb-[3.1rem] mx-auto sm:mx-0 w-[50%] sm:w-[28rem] h-fit" />,
            title: "Info",
            description: <>Complete <br></br> Financial Analytics</>,
        },
        {
            icons: <Dia className="sm:w-[22.7rem] mx-auto sm:mx-0 w-[50%] h-fit sm:mt-[11.2rem] sm:h-[29.2rem] sm:mb-[8.5rem]" />,
            title: "Heavy Duty",
            description: "Bulk Multi-Chain Analysis",
        },
        {
            icons: <Folder className="sm:w-[26rem] mx-auto sm:mx-0 w-[50%] h-fit sm:mb-[10rem]" />,
            title: "Speed",
            description: "Professional Portfolio Reports",
        },
    ]

    return (
        <div className="sm:mt-[50rem] mt-[15rem] sm:px-[7rem] px-[2rem]">
            <MaxContainer className="flex flex-col justify-between sm:flex-row gap-[5rem]">
                {
                    useCases.map((item, index) => {
                        return (
                            <div className="" key={index}>
                                <div>
                                    {item.icons}
                                </div>
                                <p className="sm:text-[1.4rem mt-[2rem] sm:mt-0 text-[1rem] text-center text-[#7EF9FF]">{item.title}</p>
                                <p className="font-[400] sm:text-[2.8rem] text-[2rem] text-white text-center mx-auto max-w-[18rem] sm:max-w-[25rem]">{item.description}</p>
                            </div>
                        )
                    })
                }
            </MaxContainer>
        </div>
    );
}

export default UseCase;