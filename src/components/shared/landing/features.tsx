import MaxContainer from "../common/maxcontainer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Features = () => {

    return (
        <section
            className="sm:px-[7rem] px-[2.5rem]"
        >
            <MaxContainer
                className="mt-[10rem]"
            >
                <h2
                    className="font-[400] text-center sm:text-start sm:text-[2.6rem] text-[2.4rem] text-white"
                >
                    Features
                </h2>

                <div
                    className="sm:grid sm:grid-cols-2  mt-[2rem] gap-[2rem] sm:mt-[3rem] sm:gap-[3rem]"
                >
                    <EnterpriseCollaboration />
                    <PeriodicOnchainStatement />
                    <MultiChainSupport />
                </div>
            </MaxContainer>
        </section>
    );
}

interface Feature {
    icons?: React.ReactNode;
    title?: string | React.ReactNode;
    pargragh?: string;
    classNames?: string;
}

const EnterpriseCollaboration = () => {
    return (
        <div
            className="rounded-[2rem] bg-[url(/common/card-bg.png)] bg-no-repeat bg-[length:100%_100%] sm:px-[3rem] px-[1.5rem] py-[2.5rem]"
        >
            <img
                src="/common/enterprise-collaboration.svg"
                alt="enterprise-collaboration"
                className="sm:size-[38rem] size-[26rem] mx-auto"
            />
            <FeatureContent
                title="Enterprise Collaboration"
                pargragh="Share wallet analytics and reports across your team.Collaborate on portfolio tracking, enable multi-user workspaces & maintain unified visibility across organizational wallets."
                classNames="max-w-[39rem] mt-[4rem]"
            />
        </div>
    )
}

const PeriodicOnchainStatement = () => {
    return (
        <div
            className="rounded-[2rem] bg-[url(/common/card-bg.png)] mt-[3rem] sm:mt-0 bg-no-repeat sm:px-[3rem] px-[1.5rem] pb-[2.5rem]"
        >
            <img
                src="/common/periodic-onchain-statement.png"
                alt="periodic-onchain-statement"
                className="sm:h-[38rem] h-[26rem] mx-auto"
            />
            <FeatureContent
                title="Periodic Onchain Statement"
                pargragh="Monthly reports summarizing your onchain activity, including DEX/CEX volumes, transaction statistics, chains & protocols interacted with, gas spent, & key portfolio metrics. "
                classNames="max-w-[34rem] mt-[4rem]"
            />
        </div>
    )
}

const MultiChainSupport = () => {
    return (
        <div
            className="flex sm:flex-row flex-col items-center mt-[3rem] sm:mt-0 col-span-2 bg-[url(/common/last-card-bg.png)] bg-no-repeat bg-[length:100%_100%] rounded-[3rem] justify-between pt-[3rem] sm:pt-0  sm:px-[3rem] px-[1.5rem]"
        >
            <div className="flex flex-col">
                <FeatureContent
                    title="Multi-Chain Support"
                    pargragh="Track and analyze wallet activity across multiple blockchains from a single dashboard. "
                    classNames="max-w-[24rem] text-center sm:text-start"
                />

                <Button asChild className="bg-white w-fit rounded-[3rem] font-[700] mx-auto sm:mx-0 text-[1.2rem] mt-[3rem] uppercase text-[#030712] py-[2rem] px-[2.2rem]">
                    <Link to="/dashboard">
                        Try Mojuto
                    </Link>
                </Button>
            </div>

            <img
                src="/common/multi-chain-support.svg"
                alt="multi-chain-support"
                className="sm:w-[64rem]"
            />

        </div>
    )
}

const FeatureContent = ({ title, pargragh, classNames = "" }: Feature) => {
    return (
        <div
            className={classNames}
        >
            <h3
                className="text-[#FFFFFF] sm:text-[2rem] text-[1.8rem] font-[400]"
            >
                {title}
            </h3>
            <p
                className="text-[#7C8E97] sm:text-[1.4rem] text-[1.2rem] mt-[.4rem] font-[400]"
            >
                {pargragh}
            </p>
        </div>
    )
}

export default Features;
