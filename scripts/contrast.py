import sys, json
def lum(c):
    def f(v):
        v/=255
        return v/12.92 if v<=0.03928 else ((v+0.055)/1.055)**2.4
    r,g,b=c; return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)
def cr(a,b):
    la,lb=lum(a),lum(b)
    if la<lb: la,lb=lb,la
    return (la+0.05)/(lb+0.05)

LIGHT = dict(
 surface=(243,237,224), low=(250,247,240), high=(232,224,206), variant=(217,205,180),
 on=(28,33,48), on2=(45,51,69), on3=(74,80,100), subtle=(90,85,75),
 outline=(122,116,100),
 primary=(38,64,112), onprimary=(250,247,240), pc=(234,239,247), pc2=(211,221,237), onpc=(29,50,88),
 verd=(61,117,105), vc=(233,242,239), onvc=(46,92,82),
 ochre=(184,134,52), oc=(248,239,221), onoc=(124,87,24),
 terra=(160,78,56), tc=(246,230,225), ontc=(122,56,38),
 gold=(150,112,34), gold7=(124,95,34),
 inv=(28,33,48), oninv=(250,247,240), invacc=(240,223,186), invmuted=(232,224,206),
)
DARK = dict(
 surface=(22,24,33), low=(29,32,44), high=(42,46,61), variant=(62,67,84),
 on=(238,233,222), on2=(214,210,200), on3=(184,182,176), subtle=(176,172,162),
 outline=(138,142,158),
 primary=(166,190,236), onprimary=(18,30,58), pc=(33,46,77), pc2=(45,62,100), onpc=(196,210,244),
 verd=(120,186,170), vc=(30,52,48), onvc=(176,222,210),
 ochre=(214,170,86), oc=(58,46,22), onoc=(238,206,140),
 terra=(226,140,116), tc=(66,36,30), ontc=(244,190,172),
 gold=(214,176,92), gold7=(226,190,110),
 inv=(48,53,70), oninv=(238,233,222), invacc=(240,214,150), invmuted=(206,202,192),
)
PAIRS = [
 ("on/surface","on","surface",4.5),("on2/surface","on2","surface",4.5),("on3/surface","on3","surface",4.5),
 ("subtle/surface","subtle","surface",4.5),("subtle/low","subtle","low",4.5),("subtle/high","subtle","high",4.5),
 ("on3/low","on3","low",4.5),("on/low","on","low",4.5),("on2/low","on2","low",4.5),
 ("primary(link)/surface","primary","surface",4.5),("primary(link)/low","primary","low",4.5),("primary/high","primary","high",4.5),
 ("onprimary/primary","onprimary","primary",4.5),
 ("onpc/pc","onpc","pc",4.5),("onpc/pc2","onpc","pc2",4.5),("primary/pc","primary","pc",4.5),
 ("onvc/vc","onvc","vc",4.5),("onoc/oc","onoc","oc",4.5),("ontc/tc","ontc","tc",4.5),
 ("verd(text)/surface","verd","surface",4.5),("terra(text)/surface","terra","surface",4.5),("onvc/surface","onvc","surface",4.5),("ontc/surface","ontc","surface",4.5),("onoc/surface","onoc","surface",4.5),
 ("oninv/inv","oninv","inv",4.5),("invacc/inv","invacc","inv",4.5),("invmuted/inv","invmuted","inv",4.5),
 ("gold(ui)/surface","gold","surface",3.0),("gold(ui)/low","gold","low",3.0),("outline/surface","outline","surface",3.0),("outline/low","outline","low",3.0),
 ("gold7/surface","gold7","surface",4.5),
]
bad=0
for name,pal in (("LIGHT",LIGHT),("DARK",DARK)):
    print("==",name)
    for label,a,b,need in PAIRS:
        r=cr(pal[a],pal[b]); ok=r>=need
        if not ok: bad+=1
        print(f"{'ok ' if ok else 'FAIL'} {label:26s} {r:5.2f} (need {need})")
print("failures:",bad)
