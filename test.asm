data0 .dw $80, $20, $0
data1: .dw $100, $10, $0
.dw $80, $20, $0
main ; comment1
main2:
  main3:
  clc
  ror a                         ; comment
  ror A                         ; comment
  ror   A                         ; comment
  ror aardvark
  lda #100
  lda #100 ; comment2
  sta $0
  sta 256
  sta $100
  sta $100,x
  sta 256,x
  sta $100,y
  sta 256,y
  sta ($100),y
  sta (256),y
  sta ($100,x)
	sta (256,x)

  sta ( $100, X )
  sta ( $100 ) , Y

  jmp ($10)
  jmp (16)
  jmp 16
  jmp main

  bne main
