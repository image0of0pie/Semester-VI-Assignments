import React from "react";
function Child(params) {
  const { t, setT } = params;
  return <button onClick={() => setT(t + 1)} name="setter" />;
}
export default function Test() {
  const [t, setT] = React.useState(1);
  return (
    <div>
      <p>{t}</p>
      <Child t={t} setT={setT} />
    </div>
  );
}
