import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from "@/components/ui/tabs"
import { cn } from "@/lib/utils";

interface TabsProps {
    options: string[];
    classNames?: {
        tabs?: string;
        list?: string;
        trigger?: string;
    },
    content: React.ReactNode[];
}

const CustomTab = ({
    options,
    classNames,
    content: Content
}: TabsProps) => {
    return (
        <Tabs
            defaultValue={options[0]}
            className={cn("w-full mt-[4rem] rounded-[2rem]", classNames?.tabs)}
        >
            <TabsList className={cn("h-full mx-auto !bg-[#F6F8FB] rounded-[2rem] !p-0 shadow", classNames?.list)}>
                {
                    options.map((option, index) => (
                        <TabsTrigger
                            key={index}
                            value={option}
                            className={cn("px-[2.7rem] py-[.8rem] text-[1.6rem] rounded-[2rem] !h-full text-grey-300 data-[state=active]:text-fg-base", classNames?.trigger)}
                        >
                            {option}
                        </TabsTrigger>
                    ))
                }
            </TabsList>
            {
                Content.map((content, index) => (
                    <TabsContent
                        key={index}
                        value={options[index]}
                    >
                        {content}
                    </TabsContent>
                ))
            }
        </Tabs>
    );
}

export default CustomTab;