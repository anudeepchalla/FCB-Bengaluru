export default function Footer({ copy }) {
  return (
    <footer className="footer">
      <div className="footer-brand"><strong>FCB</strong> BENGALURU</div>
      <div className="footer-copy">
        {copy || (
          <>
            © 2025 FCB Bengaluru. Unofficial fan club. Not affiliated with FC Barcelona.<br />
            All club crests &amp; trademarks belong to Futbol Club Barcelona.
          </>
        )}
      </div>
      <div className="footer-mes">Més Que Un Club</div>
    </footer>
  );
}
