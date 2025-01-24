import { fireEvent, screen, render } from "@testing-library/react";
import ImageUpload from "../ImageUpload";
import { IMAGE_UPLOAD_CONFIG } from "@/test_configs";

const mockObjectURL = "blob:mock-url";

// Create mock URL environment
const mockURL = {
  createObjectURL: jest.fn(() => mockObjectURL),
  revokeObjectURL: jest.fn(),
  canParse: jest.fn(() => true),
};

beforeEach(() => {
  // @ts-ignore - Ignoring type checking for test mock
  global.URL = mockURL;
  jest.clearAllMocks();
});

afterEach(() => {
  jest.resetAllMocks();
});

jest.mock("lucide-react", () => ({
  Filter: () => <div data-testid="filter">MockedFilter</div>,
  AlertCircle: () => <div data-testid="alert-circle">MockedAlertCircle</div>,
  ArrowUp: () => <div data-testid="arrow-up">MockedArrowUp</div>,
  Clock: () => <div data-testid="clock">MockedClock</div>,
  Users: () => <div data-testid="users">MockedUsers</div>,
  Camera: () => <div data-testid="camera">MockedCamera</div>,
  X: () => <div data-testid="x">MockedX</div>,
}));

describe("ImageUpload", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render a label and an input", () => {
    render(<ImageUpload image={null} setImage={() => {}} />);
    const label = screen.getByTestId(IMAGE_UPLOAD_CONFIG.uploadPhotoText);
    const input = screen.getByTestId(IMAGE_UPLOAD_CONFIG.fileInput);
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it("should render a preview of the image", () => {
    const image = new File(["(⌐□_□)"], "chucknorris.png", {
      type: "image/png",
    });
    render(<ImageUpload image={image} setImage={() => {}} />);
    const preview = screen.getByTestId(IMAGE_UPLOAD_CONFIG.previewName);
    expect(preview).toBeInTheDocument();
  });

  it("should call setImage and setPreviewUrl when an image is uploaded", () => {
    const image = new File(["(⌐□_□)"], "chucknorris.png", {
      type: "image/png",
    });
    const setImage = jest.fn();
    render(<ImageUpload image={null} setImage={setImage} />);
    const input = screen.getByTestId(IMAGE_UPLOAD_CONFIG.fileInput);
    fireEvent.change(input, { target: { files: [image] } });
    expect(setImage).toHaveBeenCalledWith(image);
  });

  it("should render a preview of the image", () => {
    const image = new File(["(⌐□_□)"], "chucknorris.png", {
      type: "image/png",
    });
    render(<ImageUpload image={image} setImage={() => {}} />);
    const preview = screen.getByTestId(IMAGE_UPLOAD_CONFIG.previewName);
    expect(preview).toBeInTheDocument();
  });

  it("should handle image preview correctly", () => {
    const image = new File(["(⌐□_□)"], "chucknorris.png", {
      type: "image/png",
    });
    render(<ImageUpload image={image} setImage={() => {}} />);

    // Check if createObjectURL was called with the correct file
    expect(URL.createObjectURL).toHaveBeenCalledWith(image);

    // Check if the preview name is displayed
    const preview = screen.getByTestId(IMAGE_UPLOAD_CONFIG.previewName);
    expect(preview).toBeInTheDocument();
    expect(preview.textContent).toBe("chucknorris.png");
  });
});
