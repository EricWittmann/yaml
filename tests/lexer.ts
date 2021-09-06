import { Lexer } from 'yaml'

test('unexpected unindent in quoted string with CRLF', () => {
  const src = '- "\r\nx"'
  let n = 0
  const res: string[] = []
  for (const lex of new Lexer().lex(src)) {
    res.push(lex)
    if (++n === 10) break
  }
  expect(res).toEqual(['\u0002', '-', ' ', '"', '\r\n', '\u001f', 'x"'])
})

test('plain scalar + CRLF + comment', () => {
  const src = 'foo\r\n# bar'
  const res = Array.from(new Lexer().lex(src))
  expect(res).toEqual(['\u0002', '\u001f', 'foo', '\r\n', '# bar'])
})
