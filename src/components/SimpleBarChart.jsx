const SimpleBarChart = ({ data }) => {
  const maxAmount = Math.max(...data.map((d) => Number(d.amount)));

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "flex-end",
        height: "250px",
        padding: "20px 0",
        borderBottom: "1px solid #ccc",
        width: "100%",
      }}
    >
      {data.map((item) => {
        // Calculate height in px relative to container
        const heightPx = (item.amount / maxAmount) * 200; // 200px max for bars

        return (
          <div key={item.id} style={{ textAlign: "center", flex: 1 }}>
            {/* Amount label */}
            <div
              style={{
                marginBottom: "4px",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              ${item.amount}
            </div>

            {/* Bar */}
            <div
              style={{
                height: `${heightPx}px`,
                backgroundColor: "#e17654",
                borderRadius: "6px 6px 0 0",
                width: "40px",
                margin: "0 auto",
              }}
            ></div>

            {/* Date label */}
            <small>{item.date}</small>
          </div>
        );
      })}
    </div>
  );
};

export default SimpleBarChart;
