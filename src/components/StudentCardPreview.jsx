import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import logo from "../assets/rn-logo.png";

const StudentCardPreview = ({ data }) => {
  const cardRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [dateNow, setDateNow] = useState("");
  const [expiry, setExpiry] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate =
      `${currentDate.toLocaleDateString()}` +
      "   " +
      `${currentDate.toLocaleTimeString()}`;
    setDateNow(formattedDate);

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 5);
    setExpiry(expiryDate.toLocaleDateString());
  }, []);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    setIsDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 3,
      });

      const link = document.createElement("a");
      link.download = `${data.name}-student-id.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error downloading image:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="container py-4 mb-5">
      <div className="d-flex justify-content-center mb-4">
        <div
          ref={cardRef}
          className="card shadow-lg"
          style={{
            width: "350px",
            height: "500px",
            border: "4px solid #0d6efd",
            borderRadius: "15px",
            overflow: "hidden",
            position: "relative",
            background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          }}
        >
          {/* School Header with Logo */}
          <div
            className="bg-primary text-white py-2 d-flex justify-content-center align-items-center"
            style={{
              borderBottom: "2px solid #0a58ca",
              height: "80px",
            }}
          >
            <div className="text-center">
              <div className="d-flex justify-content-center align-items-center mb-1">
                {/* School Logo - Replace with your actual logo */}
                <div
                  className="bg-white rounded-circle d-flex justify-content-center align-items-center me-2"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                >
                  <span className="text-primary fw-bold">
                    <img
                      src={logo}
                      alt="logo"
                      height={45}
                      width={45}
                      className="img-fluid object-fit-cover rounded-circle"
                    />
                  </span>
                </div>
                <h4 className="mb-0 fw-bold">COLLEGE ID</h4>
              </div>
              <small>2025-2026 Academic Year</small>
            </div>
          </div>

          {/* Student Photo Section */}
          <div className="d-flex justify-content-between px-3 mt-3">
            <div
              style={{
                width: "120px",
                height: "150px",
                border: "2px solid #0d6efd",
                borderRadius: "5px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              {data.image ? (
                <img
                  src={data.image}
                  alt="student"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div className="w-100 h-100 bg-light d-flex justify-content-center align-items-center">
                  <span className="text-muted">Photo</span>
                </div>
              )}
            </div>

            {/* Student Basic Info */}
            <div style={{ width: "calc(100% - 140px)" }}>
              <table className="table table-sm table-borderless">
                <tbody>
                  <tr>
                    <td
                      className="fw-bold"
                      style={{ width: "30%", fontSize: "12px" }}
                    >
                      ID:
                    </td>
                    <td style={{ fontSize: "12px" }}>{data.rollno}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold" style={{ fontSize: "12px" }}>
                      Name:
                    </td>
                    <td style={{ fontSize: "12px" }}>{data.name}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold" style={{ fontSize: "12px" }}>
                      Class:
                    </td>
                    <td style={{ fontSize: "12px" }}>{data.classDivision}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold" style={{ fontSize: "12px" }}>
                      DOB:
                    </td>
                    <td style={{ fontSize: "12px" }}>{data.dob}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold" style={{ fontSize: "12px" }}>
                      Blood:
                    </td>
                    <td style={{ fontSize: "12px" }}>{data.bloodGroup}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Detailed Information Section */}
          <div className="px-3 mt-2">
            <div className="card mb-2" style={{ borderRadius: "5px" }}>
              <div className="card-body p-2">
                <table className="table table-sm table-borderless mb-0">
                  <tbody>
                    <tr>
                      <td
                        className="fw-bold"
                        style={{ width: "40%", fontSize: "12px" }}
                      >
                        Rack No:
                      </td>
                      <td style={{ fontSize: "12px" }}>{data.rackNumber}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold" style={{ fontSize: "12px" }}>
                        Bus Route:
                      </td>
                      <td style={{ fontSize: "12px" }}>{data.busRoute}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold" style={{ fontSize: "12px" }}>
                        Allergies:
                      </td>
                      <td style={{ fontSize: "12px" }}>
                        {data.allergies.join(", ") || "None"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* QR Code and Signature Section */}
          <div className="d-flex justify-content-between px-3 mt-0">
            <div
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "white",
                padding: "5px",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <QRCode value={JSON.stringify(data)} size={90} level="H" />
            </div>
            <div
              style={{
                width: "120px",
                height: "60px",
                borderTop: "1px solid #000",
                textAlign: "center",
                paddingTop: "5px",
              }}
            >
              <div style={{ fontSize: "10px" }}>Authorized Signature</div>
              <div
                style={{
                  borderTop: "1px dashed #000",
                  marginTop: "15px",
                  width: "100%",
                }}
              ></div>
            </div>
          </div>

          {/* ID Card Footer */}
          <div
            className="position-absolute bottom-0 w-100 py-1 text-center small"
            style={{
              backgroundColor: "#0d6efd",
              color: "white",
              fontSize: "10px",
            }}
          >
            <div>
              Valid Upto From: {dateNow} To {expiry}•
            </div>
            <div>R.N.College,Chauhatta, Hajipur, Bihar</div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center">
        <button
          className="btn btn-success btn-lg"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? "Downloading..." : "Download ID Card"}
        </button>
      </div>
    </div>
  );
};

export default StudentCardPreview;
