import { useEffect, useRef } from "react";
import { useKBar } from "kbar";

export default function OpenAtHandler({ openAt, onOpened }) {
  const { query } = useKBar();
  const lastOpenAt = useRef(null);

  useEffect(() => {
    if (!openAt || openAt === lastOpenAt.current) {
      return;
    }
    lastOpenAt.current = openAt;
    query.setCurrentRootAction(openAt);
    query.setSearch("");
    if (!query.isOpen) {
      query.toggle();
    }
    onOpened?.();
  }, [openAt, onOpened, query]);

  return null;
}
