export function downloadString(str: string, options: {
  filename: string,
  type?: string
}) {
  const blob = new Blob([str], {
    type: options.type,
  });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', options.filename);
  link.click();
}