import CallToActionWithIllustration from "@/components/public/InitialHomeComponent";
import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/react";
import ThemeToggleButton from "@/components/public/ThemeToggleButton";

describe('CallToActionWithIllustration', () => {
    it("Should render properly", () => {
        render(<ThemeToggleButton  />);
     
    })
})