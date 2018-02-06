data0 .dw $80, $20, $0
data1: .dw $100, $10, $0
.dw $80, $20, $0
main ; comment1
main2:
  main3:
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

  sta ( $100, x )
  sta ( $100 ) , y

  sta ( 5 * 5, x )
  sta ( 20 / 50 ) , y
;; jmp ($10)
 ;; jmp (16)
  ;; jmp 16
   ;; jmp main
