import { expect, type Page } from '@playwright/test';

// Kiểm bố cục cho Definition of Done mục 3 (docs/TECH.md mục 11): không cuộn ngang, không tràn chữ,
// vùng chạm ≥ 44×44 px, chữ ≥ 16 px. Chạy trong trang và trả về danh sách vi phạm dạng chữ để báo lỗi dễ đọc.

const MIN_TOUCH_PX = 44;
const MIN_TEXT_PX = 16;

interface AuditLimits {
  minTouch: number;
  minText: number;
}

/** Chạy trong trình duyệt (được `page.evaluate` tuần tự hóa), nên không được dùng biến ngoài. */
const auditInPage = ({ minTouch, minText }: AuditLimits): string[] => {
  const problems: string[] = [];
  const width = window.innerWidth;
  const scrollWidth = document.documentElement.scrollWidth;
  if (scrollWidth > width)
    problems.push(
      `cuộn ngang: scrollWidth ${scrollWidth} > innerWidth ${width}`,
    );

  const isShown = (element: Element): boolean => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    return (
      rect.width > 0 &&
      rect.height > 0 &&
      style.visibility !== 'hidden' &&
      style.display !== 'none'
    );
  };
  const describe = (element: Element): string => {
    const text = (
      element.getAttribute('aria-label') ??
      element.textContent ??
      ''
    )
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 30);
    return `<${element.tagName.toLowerCase()}> "${text}"`;
  };

  // Vùng chạm: mọi phần tử bấm được đều mang `data-touch-target` (src/features/ui/button.tsx).
  document.querySelectorAll('[data-touch-target]').forEach((element) => {
    if (!isShown(element)) return;
    const rect = element.getBoundingClientRect();
    if (rect.width < minTouch - 0.5 || rect.height < minTouch - 0.5)
      problems.push(
        `vùng chạm nhỏ ${Math.round(rect.width)}×${Math.round(rect.height)} px: ${describe(element)}`,
      );
  });

  // Chữ: đo đúng vị trí của từng đoạn chữ (không phải khung chứa) để bắt chữ tràn ra ngoài mép màn hình.
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const parent = node.parentElement;
    if (!parent || !node.textContent?.trim()) continue;
    if (parent.closest('svg, script, style, noscript')) continue;
    if (!isShown(parent)) continue;

    const range = document.createRange();
    range.selectNodeContents(node);
    const rect = range.getBoundingClientRect();
    if (rect.left < -0.5 || rect.right > width + 0.5)
      problems.push(`chữ tràn khỏi mép màn hình: ${describe(parent)}`);

    const fontSize = parseFloat(getComputedStyle(parent).fontSize);
    if (fontSize < minText)
      problems.push(
        `chữ nhỏ ${fontSize}px (< ${minText}px): ${describe(parent)}`,
      );
  }
  return problems;
};

/** Danh sách vi phạm bố cục ở trạng thái hiện tại của trang (rỗng nghĩa là đạt). */
export async function findLayoutProblems(page: Page): Promise<string[]> {
  return page.evaluate(auditInPage, {
    minTouch: MIN_TOUCH_PX,
    minText: MIN_TEXT_PX,
  });
}

/** Khẳng định bố cục đạt; `where` nêu màn hình đang kiểm để thông báo lỗi chỉ đúng chỗ. */
export async function expectLayoutOk(page: Page, where: string): Promise<void> {
  const viewport = page.viewportSize();
  expect(
    await findLayoutProblems(page),
    `Bố cục lỗi ở "${where}" (${viewport?.width}×${viewport?.height})`,
  ).toEqual([]);
}
