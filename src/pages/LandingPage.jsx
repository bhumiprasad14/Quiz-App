import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="container">
      <div className="card" style={{display:'flex',gap:24,alignItems:'center',padding:'48px'}}>
        <div style={{flex:1}}>
          <h1 style={{margin:0,fontSize:42,color:'var(--primary)'}}>QuizApp — Test Your Knowledge</h1>
          <p className="muted" style={{marginTop:12,fontSize:16}}>Create quizzes, attempt as a student, and view results — fast and simple.</p>

          <div style={{marginTop:22,display:'flex',gap:12}}>
            <Link to="/register" className="btn primary">Get Started</Link>
            <Link to="/login" className="btn ghost">Sign In</Link>
          </div>
        </div>

        <div style={{width:360,display:'flex',justifyContent:'center'}}>
          <div style={{width:320,height:220,background:'linear-gradient(135deg, rgba(255,212,0,0.12), rgba(255,212,0,0.04))',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--primary)'}}>
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:56,fontWeight:800}}>📝</div>
              <div className="muted">Create & take quizzes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
