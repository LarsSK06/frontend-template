"use client";

import Spawner from "@/components/Spawner";

import { Button } from "@mantine/core";
import { t } from "i18next";

const Page = () => {
    return (
        <Spawner pre={{ opacity: 0, transform: "translateY(-10px)" }} style={{ display: "block", transition: "1s ease" }}>
            <Button>
                {t("general.HelloWorld")}
            </Button>
        </Spawner>
    );
};

export default Page;