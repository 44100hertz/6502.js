loop:
  beq loop

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
  ror a
  lda #100
  lda #100 ; comment2
  sta $0
  sta 256
  sta $100
  sta $100,x
  sta 256,x
  sta $100,y
  sta 256,y
  sta ($10),y
  sta (255),y
  sta ($10,x)
	sta (255,x)

  sta ( $10, X )
  sta ( $10 ) , Y

  jmp ($10)
  jmp (16)
  jmp 16
  jmp main

  bne main
