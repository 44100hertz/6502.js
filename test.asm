main:
  lda #100
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
  ;; jmp ($10)
  ;; jmp (16)
  ;; jmp 16
  ;; jmp main
