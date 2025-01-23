import { render, screen } from "@testing-library/react";
import AnalyticsCard from "../AnalyticsCard";
import { ANALYTICS_CARD_CONFIG } from "@/test_configs";

const defaultProps = {
  cardTitle: "Card Title",
  cardData: "Card Data",
  icon: <div data-testid="icon">MockedIcon</div>,
};

const { title, data } = ANALYTICS_CARD_CONFIG;

describe("AnalyticsCard", () => {
  it("should render correctly", () => {
    render(<AnalyticsCard {...defaultProps} />);
    const container = screen.getByTestId(ANALYTICS_CARD_CONFIG.container);
    const cardTitle = screen.getByTestId(title);
    const cardData = screen.getByTestId(data);
    const icon = screen.getByTestId("icon");
    expect(container).toBeInTheDocument();
    expect(cardTitle).toBeInTheDocument();
    expect(cardData).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });
});
