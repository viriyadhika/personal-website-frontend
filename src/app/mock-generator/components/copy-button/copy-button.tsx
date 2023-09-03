import { Button } from "@arco-design/web-react";
import { MutableRefObject, useState } from "react";
import { Param } from "../../utils/type";
import styles from "./toast.module.css";

export default function CopyButton({
  configRef,
  title,
  formatter,
}: {
  configRef: MutableRefObject<Param>;
  title: string;
  formatter: (param: Param) => string;
}) {
  const [show, setShow] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(formatter(configRef.current));
      setShow(true);
    } catch (err) {
      setShowFail(true);
    }
  };

  return (
    <div className={styles.container}>
      <Button onClick={copyContent}>{title}</Button>
      <div
        className={`${styles.toast} ${show ? styles.toastShow : ""}`}
        onTransitionEnd={() => setShow(false)}
      >
        {`${title} successful!`}
      </div>
      <div
        className={`${styles.toast} ${showFail ? styles.toastFail : ""}`}
        onTransitionEnd={() => setShowFail(false)}
      >
        {`${title} unsuccessful!`}
      </div>
    </div>
  );
}
