package com.project.hrm.Utils;

import java.util.ArrayList;
import java.util.List;
//Công cụ Uid
public class UidUtil {
    private static final int CODE_LENGTH = 10000; // 4 ký tự phía sau SB -> vd SBxxxx
    private static List<Integer> generatedCodes = new ArrayList<>();

    //Hàm tạo ngẫu nhiên uid không trùng
    public String GenerateUid(String uidPrefix) {
        boolean isDuplicate;
        int randomInt;

        do {
            double randomDouble = Math.random();
            randomDouble = randomDouble * CODE_LENGTH;
            randomInt = (int) randomDouble;
            isDuplicate = generatedCodes.contains(randomInt);
        } while (isDuplicate);

        generatedCodes.add(randomInt);
        String uid = uidPrefix + randomInt;
        return uid;
    }
}
