"use client";

import ParentProps from "@/types/general/ParentProps";

import { createTheme, MantineProvider } from "@mantine/core";

import "@/utils/i18n";

const theme = createTheme({});

const Providers = ({ children }: ParentProps) => (
    <MantineProvider theme={theme}>
        {children}
    </MantineProvider>
);

export default Providers;